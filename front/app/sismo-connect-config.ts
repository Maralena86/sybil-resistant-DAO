import {
  ClaimType,
  ClaimRequest,
  SismoConnectConfig,
} from "@sismo-core/sismo-connect-client";

export { ClaimType };
export const CONFIG: SismoConnectConfig = {
  appId: "0x6fed65874f1eab7cad84573dca9d2630",
};

export const CLAIMS: ClaimRequest[] = [
  {
    // claim on Sismo Hub GitHub Contributors Data Group membership: https://factory.sismo.io/groups-explorer?search=0x1cde61966decb8600dfd0749bd371f12
    // Data Group members          = Gitcoin Passport Holders
    // value for each group member = Gitcoin Passport Score
    groupId: "0x1cde61966decb8600dfd0749bd371f12",
    claimType: ClaimType.GTE,
    value: 30,
  }
];
