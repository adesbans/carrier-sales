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
  LoadId = "load_id",
  Origin = "origin",
  Destination = "destination",
  EquipmentType = "equipment_type",
  LoadWeight = "load_weight",
}

export const INDEX_MAP: Record<QueryKey, string | null> = {
  [QueryKey.LoadId]: null,
  [QueryKey.Origin]: "OriginIndex",
  [QueryKey.Destination]: "DestinationIndex",
  [QueryKey.EquipmentType]: "EquipmentTypeIndex",
  [QueryKey.LoadWeight]: "LoadWeightIndex",
};
