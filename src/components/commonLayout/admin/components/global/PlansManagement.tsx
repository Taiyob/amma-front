/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import {
  Plus,
  Edit2,
  CheckCircle2,
  XCircle,
  Loader2,
  Search,
  ChevronDown,
} from 'lucide-react';
import {
  useGetPlansQuery,
  useUpdatePlanStatusMutation,
  useUpdatePlanMutation,
  Plan,
} from '@/redux/api/plans.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import PlanModal from './PlanModal';
import { getPlanDisplayName } from '@/utils/planMapping';

export default function PlansManagement() {
  const { data: plansData, isLoading } = useGetPlansQuery();
  const [updateStatus, { isLoading: isUpdating }] = useUpdatePlanStatusMutation();
  const [updatePlan, { isLoading: isUpdatingPlan }] = useUpdatePlanMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [selectedDiscountPlan, setSelectedDiscountPlan] = useState<Plan | null>(null);
  const [newDiscount, setNewDiscount] = useState('');

  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [selectedPricePlan, setSelectedPricePlan] = useState<Plan | null>(null);
  const [newPrice, setNewPrice] = useState('');

  const plans = plansData?.data || [];

  const filteredPlans = plans.filter((plan) => {
    const term = searchTerm.toLowerCase();
    const displayName = getPlanDisplayName(plan.name).toLowerCase();
    const originalName = plan.name.toLowerCase();
    const interval = plan.interval.toLowerCase();

    return (
      displayName.includes(term) ||
      originalName.includes(term) ||
      interval.includes(term)
    );
  });

  const handleUpdateStatus = async (id: string, newStatus: boolean) => {
    try {
      await updateStatus({ id, isActive: newStatus }).unwrap();
      toast.success(
        `Plan status updated to ${newStatus ? 'Active' : 'Inactive'}`,
      );
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update status');
    }
  };

  const handleOpenDiscountModal = (plan: Plan) => {
    setSelectedDiscountPlan(plan);
    setNewDiscount(plan.discount ? String(plan.discount) : '0');
    setIsDiscountModalOpen(true);
  };

  const handleUpdateDiscount = async () => {
    if (!selectedDiscountPlan) return;
    try {
      await updatePlan({
        id: selectedDiscountPlan.id,
        data: { discount: newDiscount },
      }).unwrap();
      toast.success('Discount updated successfully');
      setIsDiscountModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update discount');
    }
  };

  const handleOpenPriceModal = (plan: Plan) => {
    setSelectedPricePlan(plan);
    setNewPrice(plan.perMonth ? String(plan.perMonth) : '');
    setIsPriceModalOpen(true);
  };

  const handleUpdatePrice = async () => {
    if (!selectedPricePlan) return;
    try {
      await updatePlan({
        id: selectedPricePlan.id,
        data: { price: Number(newPrice) },
      }).unwrap();
      toast.success('Price updated successfully');
      setIsPriceModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update price');
    }
  };

  const handleEdit = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedPlan(null);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-background p-6 rounded-xl border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Subscription Plans
          </h2>
          <p className="text-muted-foreground">
            Manage your product pricing and features
          </p>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-secondary text-background hover:bg-secondary/90 transition-all font-medium px-6">
          <Plus className="mr-2 h-4 w-4" /> Add New Plan
        </Button>
      </div>

      {/* Filters & Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search plans by name or interval..."
            className="pl-10 h-12 bg-background border-muted-foreground/20 focus:border-secondary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="bg-background p-3 rounded-lg border flex items-center justify-between px-4 h-12">
          <span className="text-sm font-medium text-muted-foreground">
            Total Plans
          </span>
          <span className="text-lg font-bold text-secondary">
            {plans.length}
          </span>
        </div>
        <div className="bg-background p-3 rounded-lg border flex items-center justify-between px-4 h-12">
          <span className="text-sm font-medium text-muted-foreground">
            Active
          </span>
          <span className="text-lg font-bold text-green-600">
            {plans.filter((p) => p.isActive).length}
          </span>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-semibold py-4">Plan Name</TableHead>
              <TableHead className="font-semibold">Interval</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">Discount</TableHead>
              <TableHead className="font-semibold">Discounted Price</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold pr-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlans.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground">
                  No plans found. Create one to get started!
                </TableCell>
              </TableRow>
            ) : (
              filteredPlans.map((plan) => (
                <TableRow
                  key={plan.id}
                  className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium py-4">
                    <div className="flex flex-col">
                      <span>{getPlanDisplayName(plan.name)}</span>
                      <span className="text-xs text-muted-foreground line-clamp-1 max-w-50">
                        {plan.description}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200">
                      {plan.interval}
                    </Badge>
                  </TableCell>

                  <TableCell className="font-bold text-secondary">
                    <div className="flex items-center gap-2">
                      ${plan.perMonth}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-secondary"
                        onClick={() => handleOpenPriceModal(plan)}>
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>

                  <TableCell>
                    {plan.interval === 'Monthly' ? (
                      <span className="text-muted-foreground text-sm">-</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        {plan.discount > -1 ? (
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 text-orange-700">
                            {plan.discount}% Off
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">0%</span>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-secondary"
                          onClick={() => handleOpenDiscountModal(plan)}>
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="font-bold text-secondary">
                    ${plan.discountedPrice}
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 group cursor-pointer h-9 px-3 hover:bg-muted/50 transition-all rounded-lg border border-transparent hover:border-muted-foreground/10"
                          disabled={isUpdating}>
                          {plan.isActive ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-green-500 group-hover:scale-110 transition-transform" />
                              <span className="text-sm font-medium text-green-600">
                                Active
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-red-400 group-hover:scale-110 transition-transform" />
                              <span className="text-sm font-medium text-red-500">
                                Inactive
                              </span>
                            </>
                          )}
                          <ChevronDown className="h-3 w-3 text-muted-foreground ml-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-32">
                        <DropdownMenuItem
                          onClick={() => handleUpdateStatus(plan.id, true)}
                          className="flex items-center gap-2 cursor-pointer">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>Active</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUpdateStatus(plan.id, false)}
                          className="flex items-center gap-2 cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50">
                          <XCircle className="h-4 w-4 text-red-400" />
                          <span>Inactive</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>

                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-100"
                        onClick={() => handleEdit(plan)}>
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      {/* <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100"
                        onClick={() =>
                          handleToggleStatus(plan.id, plan.isActive)
                        }>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Plan Modal */}
      <PlanModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        plan={selectedPlan}
      />

      {/* Discount Modal */}
      <Dialog open={isDiscountModalOpen} onOpenChange={setIsDiscountModalOpen}>
        <DialogContent className="sm:max-w-xs">
          <DialogHeader>
            <DialogTitle>Update Discount</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-1.5">
              <Label htmlFor="discount">Discount Percentage (%)</Label>
              <Input
                id="discount"
                type="number"
                value={newDiscount}
                onChange={(e) => setNewDiscount(e.target.value)}
                placeholder="e.g. 10"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDiscountModalOpen(false)}
              disabled={isUpdatingPlan}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateDiscount}
              disabled={isUpdatingPlan}
              className="bg-secondary text-background hover:bg-secondary/90">
              {isUpdatingPlan && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Price Update Modal */}
      <Dialog open={isPriceModalOpen} onOpenChange={setIsPriceModalOpen}>
        <DialogContent className="sm:max-w-xs">
          <DialogHeader>
            <DialogTitle>Update Price</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-1.5">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="e.g. 199"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPriceModalOpen(false)}
              disabled={isUpdatingPlan}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdatePrice}
              disabled={isUpdatingPlan}
              className="bg-secondary text-background hover:bg-secondary/90">
              {isUpdatingPlan && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
