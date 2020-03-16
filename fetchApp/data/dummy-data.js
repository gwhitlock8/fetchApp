import DogPark from "../models/dog_park";

const DOG_PARKS = [
  new DogPark(
    "dp1",
    "Barkin' Springs",
    "2201 Barton Springs Rd, Austin, TX 78746",
    "https://images.app.goo.gl/wqpPv5hUyMVNwgibA",
    "Barkin’ Springs is the wading area right outside of Barton Springs that does not require an entrance fee and is a local favorite to take pets to cool off during a hot day",
    4,
    false,
    true
  ),
  new DogPark(
    "dp2",
    "Bob Wentz Park",
    "7144 Comanche Trail, Austin, TX 78732",
    "https://images.app.goo.gl/hCks7db55BAwGFhn8",
    "Only a 30 minute drive from downtown Austin, Bob Wentz Park on Lake Travis is a waterfront, natural grass lawn to take your beloved pet to on a sunny day. The park does require all pets to be on a leash and they are not permitted on The Point, a shoreline area of the park.",
    4,
    false,
    false
  ),
  new DogPark(
    "dp3",
    "Emma Long Metro Park",
    "1600 City Park Rd, Austin, TX 78730",
    "https://images.app.goo.gl/jLwNwZCYyPBy9MTc6",
    "Emma Long Metropolitan Park is one of the largest parks in Austin, offering camping sites, trails, lake front swimming and much more. Dogs are required on leash but there are plenty of things to do with them while you explore the expansive park",
    3,
    false,
    false
  )
];

export default DOG_PARKS;
