export interface ITeamMember {
  id: string;
  name: string;
  email: string;
  designation: string;
  contact: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITeamResponse {
  success: boolean;
  message: string;
  meta: {
    requestId: string;
    timestamp: string;
  };
  data: ITeamMember[];
}

export interface ISingleTeamResponse {
  success: boolean;
  message: string;
  meta: {
    requestId: string;
    timestamp: string;
  };
  data: ITeamMember;
}
