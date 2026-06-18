export class RegisterDto {
  email: string;
  password: string;
  fullName: string;
  roleId: number;

  entName?: string;
  logo?: string;
  telephoneNumber?: string;
  companyEmail?: string;
  businessSectorId?: number;
  businessSizeId?: number;
  subSectorId?: number;
}