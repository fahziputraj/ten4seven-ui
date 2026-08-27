/* Curated non-Solar and AAPM-owned Iconify data for the physical/biological
   nouns in the registry. Keeping this map explicit preserves the tree-shaking
   boundary. */
import phBank from "@iconify-icons/ph/bank-duotone";
import phWarehouse from "@iconify-icons/ph/warehouse-duotone";
import phEgg from "@iconify-icons/ph/egg-duotone";
import phFactory from "@iconify-icons/ph/factory-duotone";
import phClipboardText from "@iconify-icons/ph/clipboard-text-duotone";
import phStorefront from "@iconify-icons/ph/storefront-duotone";
import phBasket from "@iconify-icons/ph/basket-duotone";
import phBarn from "@iconify-icons/ph/barn-duotone";
import phTractor from "@iconify-icons/ph/tractor-duotone";
import phPlant from "@iconify-icons/ph/plant-duotone";
import phGrains from "@iconify-icons/ph/grains-duotone";
import phFan from "@iconify-icons/ph/fan-duotone";
import phBird from "@iconify-icons/ph/bird-duotone";
import phEggCrack from "@iconify-icons/ph/egg-crack-duotone";
import phScales from "@iconify-icons/ph/scales-duotone";
import phChartDonut from "@iconify-icons/ph/chart-donut-duotone";
import phPercent from "@iconify-icons/ph/percent-duotone";
import phStack from "@iconify-icons/ph/stack-duotone";
import phPackage from "@iconify-icons/ph/package-duotone";
import phCube from "@iconify-icons/ph/cube-duotone";
import phStethoscope from "@iconify-icons/ph/stethoscope-duotone";
import phPill from "@iconify-icons/ph/pill-duotone";
import phFirstAidKit from "@iconify-icons/ph/first-aid-kit-duotone";
import phMicroscope from "@iconify-icons/ph/microscope-duotone";
import phVirus from "@iconify-icons/ph/virus-duotone";
import phTruck from "@iconify-icons/ph/truck-duotone";
import phPiggyBank from "@iconify-icons/ph/piggy-bank-duotone";
import phCoins from "@iconify-icons/ph/coins-duotone";
import phCurrency from "@iconify-icons/ph/currency-circle-dollar-duotone";
import phHandCoins from "@iconify-icons/ph/hand-coins-duotone";
import phReceipt from "@iconify-icons/ph/receipt-duotone";
import { aapmDomainIcons } from "./aapmChickenIcon.js";
import mingcuteChicken from "@iconify-icons/mingcute/chicken-fill";
import mingcuteEgg from "@iconify-icons/mingcute/egg-fill";
import chicken from "@iconify-icons/healthicons/animal-chicken";
import rooster from "@iconify-icons/game-icons/rooster";
import eggClutch from "@iconify-icons/game-icons/egg-clutch";
import silo from "@iconify-icons/mdi/silo";
import corn from "@iconify-icons/mdi/corn";
import forklift from "@iconify-icons/mdi/forklift";

export const domainIconData = Object.freeze({
  ...aapmDomainIcons,
  "ph:bank-duotone": phBank,
  "ph:warehouse-duotone": phWarehouse,
  "ph:egg-duotone": phEgg,
  "ph:factory-duotone": phFactory,
  "ph:clipboard-text-duotone": phClipboardText,
  "ph:storefront-duotone": phStorefront,
  "ph:basket-duotone": phBasket,
  "ph:barn-duotone": phBarn,
  "ph:tractor-duotone": phTractor,
  "ph:plant-duotone": phPlant,
  "ph:grains-duotone": phGrains,
  "ph:fan-duotone": phFan,
  "ph:bird-duotone": phBird,
  "ph:egg-crack-duotone": phEggCrack,
  "ph:scales-duotone": phScales,
  "ph:chart-donut-duotone": phChartDonut,
  "ph:percent-duotone": phPercent,
  "ph:stack-duotone": phStack,
  "ph:package-duotone": phPackage,
  "ph:cube-duotone": phCube,
  "ph:stethoscope-duotone": phStethoscope,
  "ph:pill-duotone": phPill,
  "ph:first-aid-kit-duotone": phFirstAidKit,
  "ph:microscope-duotone": phMicroscope,
  "ph:virus-duotone": phVirus,
  "ph:truck-duotone": phTruck,
  "ph:piggy-bank-duotone": phPiggyBank,
  "ph:coins-duotone": phCoins,
  "ph:currency-circle-dollar-duotone": phCurrency,
  "ph:hand-coins-duotone": phHandCoins,
  "ph:receipt-duotone": phReceipt,
  "mingcute:chicken-fill": mingcuteChicken,
  "mingcute:egg-fill": mingcuteEgg,
  "healthicons:animal-chicken": chicken,
  "game-icons:rooster": rooster,
  "game-icons:egg-clutch": eggClutch,
  "mdi:silo": silo,
  "mdi:corn": corn,
  "mdi:forklift": forklift,
});
