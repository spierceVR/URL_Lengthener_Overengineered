import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { URLService } from "./url.service";
import { URLControllerBase } from "./base/url.controller.base";

@swagger.ApiTags("urls")
@common.Controller("urls")
export class URLController extends URLControllerBase {
  constructor(
    protected readonly service: URLService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
