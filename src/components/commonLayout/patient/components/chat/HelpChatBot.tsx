/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Phone, Mail, MessageCircle, HelpCircle, ChevronRight} from 'lucide-react';
import {ChatArea} from './ChatArea';
import {useRef} from 'react';

const HelpChatBot = () => {
  const chatRef = useRef<any>(null);
  const handleQuickHelp = (message: string) => {
    if (chatRef.current) {
      chatRef.current.sendExternalMessage(message);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Contact & Quick Help */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Us Card */}
            <Card>
              <CardContent className="p-6 space-y-5">
                <h2 className="text-lg font-semibold">Contact Us</h2>

                <div className="space-y-4 ">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 bg-muted  h-auto py-4">
                    <Phone className="h-5 w-5 " />
                    <div className="text-left">
                      <div className="font-medium">Call Us</div>
                      <div className="text-sm text-muted-foreground">
                        +233 53 702 3090
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full bg-muted  justify-start gap-3 h-auto py-4">
                    <Mail className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Email Us</div>
                      <div className="text-sm text-muted-foreground">
                        support@mojacares.com
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full bg-muted   justify-start gap-3 h-auto py-4">
                    <MessageCircle className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Live Chat</div>
                      <div className="text-sm opacity-90">Available 24/7</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Help Card */}
            <Card>
              <CardContent className="p-6 space-y-5">
                <h2 className="text-lg font-semibold">Quick Help</h2>
                <div className="space-y-2">
                  {[
                    'How Can I book an Appoitment?',
                    'What are the different methods of payment?',
                    'Who can I contact in an emergency?',
                  ].map((item) => (
                    <Button
                      key={item}
                      onClick={() => handleQuickHelp(item)}
                      variant="ghost"
                      className="w-full justify-between bg-muted text-left h-auto py-3 px-4 hover:bg-secondary/10 hover:text-secondary transition-all group border border-transparent hover:border-secondary/20">
                      <div className="flex items-center gap-3 min-w-0">
                        <HelpCircle className="h-4 w-4 shrink-0 text-secondary" />
                        <span className="text-sm font-medium whitespace-normal line-clamp-2">
                          {item}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Chat Area */}
          <div className="lg:col-span-2">
            <ChatArea ref={chatRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpChatBot;
