import { BundleMigrationType } from "@/wab/server/db/bundle-migration-utils";
import { BundledMigrationFn } from "@/wab/server/db/BundleMigrator";
import { visitRefsInFields } from "@/wab/shared/bundler";

export const migrate: BundledMigrationFn = async (bundle) => {
  // Convert IID references to string
  bundle.root = `${bundle.root}`;
  for (const key of Object.keys(bundle.map)) {
    visitRefsInFields(bundle.map[key], (ref) => {
      if ("__ref" in ref) {
        ref.__ref = `${ref.__ref}`;
      } else {
        ref.__xref.iid = `${ref.__xref.iid}`;
      }
    });
  }
};

export const MIGRATION_TYPE: BundleMigrationType = "bundled";
