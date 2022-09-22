import { Voucher } from "@prisma/client";


export type TNewVoucher = Omit<Voucher, "id" | "used">;