export default class DogPark {
  constructor(
    id,
    name,
    location,
    imageUrl,
    description,
    overallRating,
    isFenced,
    isOffLeash
  ) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.imageUrl = imageUrl;
    this.description = description;
    this.overallRating = overallRating;
    this.isFenced = isFenced;
    this.isOffLeash = isOffLeash;
  }
}
