import { Module } from "@nestjs/common";
import { URLModuleBase } from "./base/url.module.base";
import { URLService } from "./url.service";
import { URLController } from "./url.controller";
import { URLResolver } from "./url.resolver";

@Module({
  imports: [URLModuleBase],
  controllers: [URLController],
  providers: [URLService, URLResolver],
  exports: [URLService],
})
export class URLModule {}
