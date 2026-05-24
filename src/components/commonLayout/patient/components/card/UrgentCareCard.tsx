import AppButton from "@/components/ui/AppButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Phone } from "lucide-react"

export const UrgentCareCard = () => {
    return (
        <Card className="mt-10 border bg-background text-foreground">
            <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <AlertCircle className="h-6 w-6  shrink-0" />
                <div className="flex-1">
                    <h3 className="font-medium">Urgent Care Hotline</h3>
                    <p className="text-sm text-foreground mt-1">
                        Call immediately for critical medical assistance
                    </p>
                </div>
                <AppButton
                    label="Call 0302-123-456"
                    className="bg-secondary hover:bg-secondary whitespace-nowrap"
                    onClick={() => window.location.href = 'tel:+880302123456'}
                    icon={<><Phone className="mr-2 h-4 w-4" /></>}
                    textColor="text-background"
                />
              
            </CardContent>
        </Card>
    )
}
