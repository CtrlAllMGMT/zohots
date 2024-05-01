import dotenv from "dotenv";
import { Zoho } from ".";
import { ZohoApiClient } from "../client/client";

dotenv.config({ path: "./.env" });

const orgId = process.env.ZOHO_ORGANIZATION_ID as string;
const clientId = process.env.ZOHO_CLIENT_ID as string;
const clientSecret = process.env.ZOHO_CLIENT_SECRET as string;

let zoho :Zoho


beforeAll(async () => {

    const client = await ZohoApiClient.fromOAuth({
        orgId,
        client: {
            id: clientId,
            secret: clientSecret,
        },
    });
    zoho = new Zoho(client);

})

test("It should work to list all Taxes", async () => {
    const res = await zoho.tax.list();

    expect(res.length).toBeGreaterThan(0);
    expect(res[0].tax_id).toBeDefined();

});