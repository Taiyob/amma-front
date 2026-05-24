/* eslint-disable react/no-unescaped-entities */
// components/reporting-logs/ReportingLogsForm.tsx
"use client";

import { useState } from "react";
import { Upload, FileText, Sparkles, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface RecentReport {
    patientName: string;
    reportType: string;
    timeAgo: string;
}

const dummyRecentReports: RecentReport[] = [
    {
        patientName: "Abdul Khan",
        reportType: "Blood Test",
        timeAgo: "2 hours ago",
    },
    {
        patientName: "Fatima Ahmed",
        reportType: "Prescription",
        timeAgo: "4 hours ago",
    },
    {
        patientName: "Noor Hassan",
        reportType: "ECG Report",
        timeAgo: "6 hours ago",
    },
    {
        patientName: "Hassan Wong",
        reportType: "Followup",
        timeAgo: "1 day ago",
    },
];

export default function ReportingLogsForm() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [bloodPressure, setBloodPressure] = useState("");
    const [bloodSugar, setBloodSugar] = useState("");
    const [weight, setWeight] = useState("");
    const [temperature, setTemperature] = useState("");
    const [notes, setNotes] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files?.[0]) setSelectedFile(e.dataTransfer.files[0]);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const isFormReady = !!(
        bloodPressure ||
        bloodSugar ||
        weight ||
        temperature ||
        notes.trim() ||
        selectedFile
    );

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto py-8 px-4">
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left - Form (2/3 width on large screens) */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Select Patient */}
                            <Card className="space-y-2 p-10" >
                                <Label className="text-base font-medium">Select Patient</Label>
                                <Input placeholder="Select patient" className="h-11" />
                            </Card>

                            {/* Upload Documents */}
                            <Card className="space-y-3 p-10">
                                <Label className="text-base font-medium">Upload Documents</Label>
                                <div
                                    className={cn(
                                        "border-2 border-dashed rounded-xl p-10 text-center transition-all",
                                        "hover:border-primary/40 hover:bg-muted/40 cursor-pointer",
                                        selectedFile && "border-primary/50 bg-primary/5"
                                    )}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                >
                                    <input
                                        type="file"
                                        id="file-upload"
                                        className="hidden"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer block">
                                        <div className="mx-auto w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
                                            <Upload className="h-7 w-7 text-muted-foreground" />
                                        </div>
                                        <p className="font-medium text-base mb-1">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Prescription, Lab Report, Medical Certificate • PDF, JPG, PNG (Max 10MB)
                                        </p>
                                    </label>

                                    {selectedFile && (
                                        <div className="mt-6 inline-flex items-center gap-3 bg-chart-2/65 text-chart-2 px-4 py-2 rounded-lg text-sm font-medium">
                                            <FileText className="h-4 w-4" />
                                            {selectedFile.name}
                                            <Badge variant="secondary" className="bg-chart-2/65 text-chart-2">
                                                {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                            </Card>

                            {/* Manual Entry */}
                            <Card className="space-y-4 p-10">
                                <Label className="text-base font-medium">Manual Data Entry</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <Label className="text-sm">Blood Pressure</Label>
                                        <Input placeholder="e.g. 120/80" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm">Blood Sugar (mmol/L)</Label>
                                        <Input placeholder="e.g. 6.5" value={bloodSugar} onChange={(e) => setBloodSugar(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm">Weight (kg)</Label>
                                        <Input placeholder="e.g. 72" value={weight} onChange={(e) => setWeight(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm">Temperature (°F)</Label>
                                        <Input placeholder="e.g. 98.6" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm">Additional Notes</Label>
                                    <Textarea
                                        placeholder="Enter any additional observations or recommendations..."
                                        className="min-h-27.5"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                </div>
                            </Card>

                            {/* AI Summary */}
                            <Card className="space-y-4 pt-4 p-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="h-5 w-5 text-violet-600" />
                                        <span className="font-medium " >AI Summary</span>
                                    </div>
                                    <Button size="sm" className="bg-violet-600 text-background hover:bg-violet-700">
                                        Generate Summary
                                    </Button>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Fill in the health data and click "Generate Summary" to create an easy-to-understand report for the patient.
                                </p>
                            </Card>

                            {/* Publish Button */}
                            <div className="pt-6">
                                <Button
                                    size="lg"
                                    className="w-full bg-sidebar-ring hover:bg-sidebar-ring text-background gap-2"
                                    disabled={!isFormReady}
                                >
                                    <Send className="h-4 w-4" />
                                    Publish to Patient Dashboard
                                </Button>
                            </div>
                        </div>

                        {/* Right - Recent Reports */}
                        <Card className="lg:col-span-1 space-y-4">
                            <div className="p-4 ">
                                <h2 className="text-lg font-semibold tracking-tight p">Recent Reports</h2>

                                <div className="space-y-3 p-4">
                                    {dummyRecentReports.map((report, i) => (
                                        <div
                                            key={i}
                                            className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between mb-1.5">
                                                <h4 className="font-medium text-base">{report.patientName}</h4>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs uppercase px-2.5 py-0.5"
                                                >
                                                    published
                                                </Badge>
                                            </div>

                                            <div className="text-sm font-medium text-gray-800 mb-1">
                                                {report.reportType}
                                            </div>

                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <Clock className="h-3.5 w-3.5" />
                                                {report.timeAgo}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>



                    </div>
                </div>
            </div>
        </div>
    );
}