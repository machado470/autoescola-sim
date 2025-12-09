import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AdminService } from "./admin.service";

@Controller("admin")
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get("dashboard")
  async dashboard() {
    return this.adminService.getDashboardStats();
  }
}
