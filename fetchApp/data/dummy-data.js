import DogPark from "../models/dog_park";
import Dog from "../models/dog";

export const DOG_PARKS = [
  new DogPark(
    "dp1",
    "Barkin' Springs",
    "2201 Barton Springs Rd, Austin, TX 78746",
    "https://static.rootsrated.com/image/upload/s--hCSD_TfZ--/t_rr_large_natural/bt7d072i4b11x90m2ymn.jpg",
    "Barkin Springs is the wading area right outside of Barton Springs that does not require an entrance fee and is a local favorite to take pets to cool off during a hot day",
    4,
    false,
    true
  ),
  new DogPark(
    "dp2",
    "Bob Wentz Park",
    "7144 Comanche Trail, Austin, TX 78732",
    "https://txwinelover.com/wp-content/uploads/2016/02/bob-wentz-park.jpg",
    "Only a 30 minute drive from downtown Austin, Bob Wentz Park on Lake Travis is a waterfront, natural grass lawn to take your beloved pet to on a sunny day. The park does require all pets to be on a leash and they are not permitted on The Point, a shoreline area of the park.",
    4,
    false,
    false
  ),
  new DogPark(
    "dp3",
    "Emma Long Metro Park",
    "1600 City Park Rd, Austin, TX 78730",
    "http://do512family.com/wp-content/uploads/2015/07/IMG_3009.jpg",
    "Emma Long Metropolitan Park is one of the largest parks in Austin, offering camping sites, trails, lake front swimming and much more. Dogs are required on leash but there are plenty of things to do with them while you explore the expansive park",
    3,
    false,
    false
  )
];

export const DOGS = [
  new Dog(
    "1",
    "Mack",
    "Pitbull Mix",
    "3",
    "docile",
    "being chased",
    "children",
    "http://globaltravelsblog.com/wp-content/uploads/2014/05/Southeastern-Guide-Dogs-Puppy.jpg"
  )
];
