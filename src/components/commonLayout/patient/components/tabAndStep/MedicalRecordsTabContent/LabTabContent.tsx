import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

export const LabTabContent = () => {
  return (
    <div className="space-y-6">
      {/* CBC Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Complete Blood Count (CBC)</CardTitle>
              <CardDescription className="pt-1">Date: 1/13/2024</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Reference Range</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>White Blood Cells</TableCell>
                <TableCell className="font-medium">7.2</TableCell>
                <TableCell>4.0 - 11.0</TableCell>
                <TableCell>K/µL</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                    normal
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Red Blood Cells</TableCell>
                <TableCell className="font-medium">4.8</TableCell>
                <TableCell>4.2 - 5.4</TableCell>
                <TableCell>M/µL</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                    normal
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hemoglobin</TableCell>
                <TableCell className="font-medium">14.5</TableCell>
                <TableCell>13.5 - 17.5</TableCell>
                <TableCell>g/dL</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                    normal
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Platelets</TableCell>
                <TableCell className="font-medium">245</TableCell>
                <TableCell>150 - 400</TableCell>
                <TableCell>K/µL</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                    normal
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Metabolic Panel Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Metabolic Panel</CardTitle>
          <CardDescription>Date: 1/13/2024</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Reference Range</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Sodium</TableCell>
                <TableCell className="font-medium">7.2</TableCell> {/* Note: likely data entry error; typical ~135-145 mmol/L */}
                <TableCell>4.0 - 11.0</TableCell>
                <TableCell>KU/UL</TableCell> {/* likely mmol/L */}
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                    normal
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Potassium</TableCell>
                <TableCell className="font-medium">4.8</TableCell>
                <TableCell>4.2 - 5.4</TableCell>
                <TableCell>M/UL</TableCell> {/* likely mmol/L */}
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                    normal
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Creatinine</TableCell>
                <TableCell className="font-medium">14.5</TableCell> {/* Note: likely data entry error; typical ~0.6-1.3 mg/dL */}
                <TableCell>13.5 - 17.5</TableCell>
                <TableCell>g/dL</TableCell> {/* likely mg/dL */}
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                    normal
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Glucose</TableCell>
                <TableCell className="font-medium">13.6</TableCell>
                <TableCell>3.9 - 5.5</TableCell>
                <TableCell>mmol/L</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                    normal
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Separator className="my-6" />
        </CardContent>
      </Card>
    </div>
  )
}