import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { URLResolverBase } from "./base/url.resolver.base";
import { URL } from "./base/URL";
import { URLService } from "./url.service";

@graphql.Resolver(() => URL)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class URLResolver extends URLResolverBase {
  constructor(
    protected readonly service: URLService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
