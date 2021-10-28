console.log(`NEXT_PUBLIC_DFX_NETWORK=${process.env.NEXT_PUBLIC_DFX_NETWORK}`);

const DRIP_CANISTER_ID =
  process.env.NEXT_PUBLIC_DFX_NETWORK === "local"
    ? require("../../.dfx/local/canister_ids.json").Drip.local
    : process.env.NEXT_PUBLIC_DFX_NETWORK === "staging"
    ? "d3ttm-qaaaa-aaaai-qam4a-cai"
    : "d3ttm-qaaaa-aaaai-qam4a-cai";
console.log(`DRIP_CANISTER_ID=${DRIP_CANISTER_ID}`);

const IDENTITY_CANISTER_ID =
  process.env.NEXT_PUBLIC_DFX_NETWORK === "local"
    ? "rno2w-sqaaa-aaaaa-aaacq-cai"
    : undefined;
console.log(`IDENTITY_CANISTER_ID=${IDENTITY_CANISTER_ID}`);

const BAG_CANISTER_ID =
  process.env.NEXT_PUBLIC_DFX_NETWORK === "local"
    ? require("../../.dfx/local/canister_ids.json").Bag.local
    : process.env.NEXT_PUBLIC_DFX_NETWORK === "staging"
    ? "rvzx7-oqaaa-aaaaj-qagxq-cai"
    : require("../../canister_ids.json").Bag.ic;
console.log(`BAG_CANISTER_ID=${BAG_CANISTER_ID}`);

module.exports = {
  env: {
    DRIP_CANISTER_ID,
    IDENTITY_CANISTER_ID,
    BAG_CANISTER_ID,
  },
};
