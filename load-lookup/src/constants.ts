export enum Location {
  Atlanta = "Atlanta",
  Austin = "Austin",
  Boston = "Boston",
  Charlotte = "Charlotte",
  Chicago = "Chicago",
  Dallas = "Dallas",
  Denver = "Denver",
  Houston = "Houston",
  LosAngeles = "Los Angeles",
  Miami = "Miami",
  NewYork = "New York",
  Philadelphia = "Philadelphia",
  Phoenix = "Phoenix",
  SanFrancisco = "San Francisco",
  Seattle = "Seattle",
}

export enum EquipmentType {
  DryVan = "Dry Van",
  Reefer = "Reefer",
  Flatbed = "Flatbed",
  StepDeck = "Step Deck",
  BoxTruck = "Box Truck",
  PowerOnly = "Power Only",
}

export enum QueryKey {
  LoadId = "loadId",
  Origin = "origin",
  Destination = "destination",
  PickupDatetime = "pickupDatetime",
  DeliveryDatetime = "deliveryDatetime",
  EquipmentType = "equipmentType",
  LoadboardRate = "loadboardRate",
  Notes = "notes",
  Weight = "weight",
  CommodityType = "commodityType",
  NumOfPieces = "numOfPieces",
  Miles = "miles",
  Dimensions = "dimensions",
}

export const INDEX_MAP: Record<QueryKey, string | null> = {
  [QueryKey.LoadId]: null,
  [QueryKey.Origin]: "OriginIndex",
  [QueryKey.Destination]: "DestinationIndex",
  [QueryKey.PickupDatetime]: "PickupDatetimeIndex",
  [QueryKey.DeliveryDatetime]: "DeliveryDatetimeIndex",
  [QueryKey.EquipmentType]: "EquipmentTypeIndex",
  [QueryKey.LoadboardRate]: "LoadboardRateIndex",
  [QueryKey.Notes]: null,
  [QueryKey.Weight]: "WeightIndex",
  [QueryKey.CommodityType]: "CommodityTypeIndex",
  [QueryKey.NumOfPieces]: "NumOfPiecesIndex",
  [QueryKey.Miles]: "MilesIndex",
  [QueryKey.Dimensions]: "DimensionsIndex",
};

