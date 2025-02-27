import {
  BundleMigrationType,
  unbundleSite,
  upgradeHostlessProject,
} from "@/wab/server/db/bundle-migration-utils";
import { UnbundledMigrationFn } from "@/wab/server/db/BundleMigrator";
import { Bundler } from "@/wab/shared/bundler";
import { forkAllTplCodeComponentVirtualArgs } from "@/wab/shared/code-components/code-components";

export const migrate: UnbundledMigrationFn = async (bundle, db, entity) => {
  // This is a special upgrade-hostless that first forks all code component
  // virtual args, and then performs the upgrade. This is intended to go after
  // the CR where all code component default slot contents are materialized
  // at TplComponent instantiation, instead of pre-built into
  // TplSlot.defaultContents
  const bundler = new Bundler();
  const { site, siteOrProjectDep } = await unbundleSite(
    bundler,
    bundle,
    db,
    entity
  );

  forkAllTplCodeComponentVirtualArgs(site);

  const newBundle = bundler.bundle(
    siteOrProjectDep,
    entity.id,
    "142-fork-code-component-args"
  );
  Object.assign(bundle, newBundle);
  await upgradeHostlessProject(bundle, entity, db);
};

export const MIGRATION_TYPE: BundleMigrationType = "unbundled";
