"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChatMessage } from "@/redux/api/chat.api";

const WS_URL = "wss://api.mojacares.com/ws";
// const WS_URL = "ws://127.0.0.1:3030/ws";

/**
 * useSocket Hook
 * 
 * Manages WebSocket connection for real-time chat updates.
 * Supports joining rooms (sessions) and listening for new messages.
 */
export const useSocket = (roomIds: string | string[] | null) => {
    const socketRef = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState<ChatMessage | null>(null);
    const [lastEvent, setLastEvent] = useState<{ type: string; data: any } | null>(null);
    const [isOpponentTyping, setIsOpponentTyping] = useState(false);

    // Track current active rooms locally
    const currentRoomsRef = useRef<Set<string>>(new Set());
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const reconnectAttemptsRef = useRef(0);
    const MAX_RECONNECT_ATTEMPTS = 15;

    // Stable connection function - NOT dependent on roomIds
    const connect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.onclose = null;
            socketRef.current.close();
        }

        console.log("WebSocket Attempting Connection...");
        const socket = new WebSocket(WS_URL);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("WebSocket Connected");
            setIsConnected(true);
            reconnectAttemptsRef.current = 0;
            // Note: Room joining is handled by a separate useEffect
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type) {
                    setLastEvent({ type: data.type, data });
                }

                if (data.type === 'connected') return;

                const isTypingAction = data.action === "typing" || data.type === "typing";
                if (isTypingAction) {
                    setIsOpponentTyping(!!data.isTyping);
                    return;
                }

                if (data.type === 'CHAT_MESSAGE' || data.sender) {
                    const msgData = data.message || data.data || data;
                    if (msgData && msgData.message && msgData.sender) {
                        const message = {
                            ...msgData,
                            sessionId: data.sessionId || msgData.sessionId
                        } as ChatMessage;

                        setLastMessage(message);
                        setIsOpponentTyping(false);
                    }
                }
            } catch (error) {
                console.error("WS Parse Error:", error);
            }
        };

        socket.onclose = () => {
            console.warn("WebSocket Disconnected");
            setIsConnected(false);
            setIsOpponentTyping(false);
            currentRoomsRef.current.clear();

            if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
                const delay = Math.min(1000 * Math.pow(1.5, reconnectAttemptsRef.current), 30000);
                reconnectAttemptsRef.current += 1;
                console.log(`Retrying WS connection in ${Math.round(delay)}ms...`);
                reconnectTimeoutRef.current = setTimeout(connect, delay);
            }
        };

        socket.onerror = (event) => {
            console.error("WebSocket Error Detected:", {
                url: WS_URL,
                readyState: socket.readyState,
                event
            });
        };
    }, []);

    // Initial connection
    useEffect(() => {
        connect();
        return () => {
            if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
            if (socketRef.current) {
                socketRef.current.onclose = null;
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, [connect]);

    // Handle dynamic room joining/switching WITHOUT full reconnection
    useEffect(() => {
        if (!isConnected || !socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;

        const targetRooms = new Set(roomIds ? (Array.isArray(roomIds) ? roomIds : [roomIds]) : []);

        // Join new rooms added to roomIds
        targetRooms.forEach(room => {
            if (!currentRoomsRef.current.has(room)) {
                console.log(`WebSocket joining room: ${room}`);
                socketRef.current?.send(JSON.stringify({ action: "join", room }));
                currentRoomsRef.current.add(room);
            }
        });

        // Optional: Clean up rooms that are no longer requested
        currentRoomsRef.current.forEach(room => {
            if (!targetRooms.has(room)) {
                // If backend supports leave action:
                // socketRef.current?.send(JSON.stringify({ action: "leave", room }));
                currentRoomsRef.current.delete(room);
            }
        });

    }, [roomIds, isConnected]);

    const sendTyping = useCallback((isTyping: boolean) => {
        const primaryRoom = Array.isArray(roomIds) ? roomIds[0] : roomIds;
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN && primaryRoom) {
            socketRef.current.send(JSON.stringify({
                action: "typing",
                room: primaryRoom,
                isTyping
            }));
        }
    }, [roomIds]);

    return { isConnected, lastMessage, lastEvent, isOpponentTyping, sendTyping };
};
