import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as swagger from "@nestjs/swagger";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { URLResolverBase } from "./base/url.resolver.base";
import { URL } from "./base/URL";
import { URLService } from "./url.service";
import { URLCreateInput } from "./base/URLCreateInput";
import { CreateURLArgs } from "./base/CreateURLArgs";

function lengthenedURL(lastGeneratedLongUrl: string) : string {
  const newNum : BigInt = BigInt(lastGeneratedLongUrl) - BigInt(1);
  let str = newNum.toString();
  if (str.length < 1000) {
    str = "0".repeat(1000 - str.length) + str;
  }
  return str;
};

const FIRST_LONG_URL = '1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989';

@graphql.Resolver(() => URL)
// @common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class URLResolver extends URLResolverBase {
	constructor(
		protected readonly service: URLService,
		@nestAccessControl.InjectRolesBuilder()
		protected readonly rolesBuilder: nestAccessControl.RolesBuilder
	) {
		super(service, rolesBuilder);
	}

  @swagger.ApiOperation({ summary: "Create URL mapping" })
	@graphql.Mutation(() => URL)
	async createURLMapping(@graphql.Args("input") input: string) {
    const lastGeneratedLongUrl : URL[] = await this.service.findMany({
      take: 1,
      orderBy: {
        createdAt: "desc",
      },
    });
    const newURLCreateInput : URLCreateInput = {
      originalUrl: input,
      lengthenedUrl: lastGeneratedLongUrl[0] ? lengthenedURL(lastGeneratedLongUrl[0].lengthenedUrl) : FIRST_LONG_URL,
    };
    const newURLCreateArgs : CreateURLArgs = {
      data: newURLCreateInput
    };
		return this.service.create(newURLCreateArgs);
	}
}
