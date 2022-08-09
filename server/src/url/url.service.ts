import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { URLServiceBase } from "./base/url.service.base";

@Injectable()
export class URLService extends URLServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
