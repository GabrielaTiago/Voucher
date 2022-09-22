import { Chance } from "chance";
import { TNewVoucher } from "../../src/types/voucher";

const chance = Chance();

export function __createVoucher(): TNewVoucher {
  const voucher = {
    code: chance.string({ length: 5 }),
    discount: chance.integer({ min: 1, max: 100 })
  };
  return voucher;
}
