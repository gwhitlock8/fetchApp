export default class Dog {
  constructor(
    id,
    user_id,
    name,
    breed,
    age,
    weight,
    temperment,
    likes,
    dislikes,
    imageUrl
  ) {
    this.id = id;
    this.user_id = user_id;
    this.name = name;
    this.breed = breed;
    this.age = age;
    this.weight = weight;
    this.temperment = temperment;
    this.likes = likes;
    this.dislikes = dislikes;
    this.imageUrl = imageUrl;
  }
}
