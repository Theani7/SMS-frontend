import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../shared/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/components/ui/table";

const revenueData = [
  { class: "Grade 10-A", progress: 85, collected: "$12,500", pending: 3 },
  { class: "Grade 10-B", progress: 70, collected: "$10,200", pending: 6 },
  { class: "Grade 9-A", progress: 95, collected: "$14,000", pending: 1 },
  { class: "Grade 9-B", progress: 60, collected: "$8,800", pending: 8 },
  { class: "Grade 8-A", progress: 80, collected: "$11,500", pending: 4 },
];

export function RevenueMatrix() {
  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">Revenue Matrix</CardTitle>
        <CardDescription>Fee collection status by class</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto pb-2">
          <Table>
            <TableHeader>
            <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
              <TableHead className="h-10 text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4">Class</TableHead>
              <TableHead className="h-10 text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4">Collection Progress</TableHead>
              <TableHead className="h-10 text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4">Amount Collected</TableHead>
              <TableHead className="h-10 text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 text-right">Pending</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revenueData.map((row) => (
              <TableRow key={row.class} className="h-11 border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                <TableCell className="text-[12px] font-medium text-slate-900 dark:text-slate-100 px-4">
                  {row.class}
                </TableCell>
                <TableCell className="px-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 w-24 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 rounded-full transition-all" 
                        style={{ width: `${row.progress}%` }} 
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 w-8">{row.progress}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-[12px] font-medium text-slate-700 dark:text-slate-300 px-4">
                  {row.collected}
                </TableCell>
                <TableCell className="text-[12px] font-medium text-slate-700 dark:text-slate-300 px-4 text-right">
                  {row.pending} students
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  );
}
