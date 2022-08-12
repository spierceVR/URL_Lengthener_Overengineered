import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { URLService } from "./url.service";
import { URLControllerBase } from "./base/url.controller.base";
import { URL } from "./base/URL";
import { NotFoundException, Redirect } from "@nestjs/common";
import { Public } from "src/decorators/public.decorator";

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

  @Public()
	@swagger.ApiOperation({ summary: "Redirect to mapped URL" })
	@common.Get(":lengthenedUrl")
  @Redirect()
	async redirectToMappedURL(
		@common.Param("lengthenedUrl") lengthenedUrl: string
	) {
		const stored_url : URL | null = await this.service.findOne({
			where: {
				lengthenedUrl: lengthenedUrl,
			},
		});
		if (!stored_url) throw new NotFoundException();
		return {url : "http://" + stored_url.originalUrl, statusCode: 301};
	}
}
