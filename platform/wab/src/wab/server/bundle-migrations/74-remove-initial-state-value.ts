import { BundleMigrationType } from "@/wab/server/db/bundle-migration-utils";
import { BundledMigrationFn } from "@/wab/server/db/BundleMigrator";

export const migrate: BundledMigrationFn = async (bundle) => {
  for (const inst of Object.values(bundle.map)) {
    if (inst.__type === "VariantSetting") {
      delete inst["initialStateValues"];
    }
    if (inst.__type === "State") {
      inst["initVal"] = null;
    }
  }
};

export const MIGRATION_TYPE: BundleMigrationType = "bundled";
