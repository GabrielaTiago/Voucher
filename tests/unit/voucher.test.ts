import { jest } from "@jest/globals";
import { Voucher } from "@prisma/client";
import { type } from "os";
import voucherRepository from "../../src/repositories/voucherRepository";
import voucherService from "../../src/services/voucherService";
import { TNewVoucher } from "../../src/types/voucher";

import * as voucherFactory from "../factory/createVoucherFactory";

describe("Creating a voucher", () => {
  it("Should create a new voucher", async () => {
    const { code, discount } = voucherFactory.__createVoucher();

    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(voucherRepository, "createVoucher")
      .mockImplementationOnce((): any => {});

    await voucherService.createVoucher(code, discount);

    expect(voucherRepository.getVoucherByCode).toBeCalled();
    expect(voucherRepository.createVoucher).toBeCalled();
  });

  it("Shouldn't create a duplicate voucher", async () => {
    const voucher = voucherFactory.__createVoucher();

    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {
        return { voucher };
      });

    const response = await voucherService.createVoucher(
      voucher.code,
      voucher.discount
    );

    expect(voucherRepository.getVoucherByCode).toBeCalled();
    expect(response).rejects.toEqual({
      message: "Voucher already exist.",
      type: "conflict"
    });
  });
});

//describe("Apply Voucher")