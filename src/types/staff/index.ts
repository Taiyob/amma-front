export interface IStaff {
    id: string;
    staffId: string;
    name: string;
    email: string;
    contact: string;
    status: string;
    assignedCount?: number;
}

export interface IStaffResponse {
    success: boolean;
    message: string;
    meta: {
        requestId: string;
        timestamp: string;
    };
    data: IStaff[];
}
