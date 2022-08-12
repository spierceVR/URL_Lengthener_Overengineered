import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { URLService } from "./url.service";
import { URLControllerBase } from "./base/url.controller.base";
import { URL } from "./base/URL";
import { NotFoundException } from "@nestjs/common";

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

	@swagger.ApiOperation({ summary: "Redirect to mapped URL" })
	@common.Get(":lengthenedUrl")
	async redirectToMappedURL(
		@common.Param("lengthenedUrl") lengthenedUrl: string
	) {
		const stored_url : URL | null = await this.service.findOne({
			where: {
				lengthenedUrl: lengthenedUrl,
			},
		});
		if (!stored_url) throw new NotFoundException();
		return common.Redirect("http://" + stored_url.originalUrl, 301);
	}
}
