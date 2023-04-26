const { createClient } = require("redis");
(async () => {
  try {
    const redis = createClient();
    redis.on("error", (err) => console.log("redis client error", err));
    await redis.connect();
    const aString = await redis.ping(); // 'PONG'
    console.log(aString);
    // ---------------

    const { Schema, Repository, EntityId } = require("redis-om");
    const albumSchema = new Schema(
      "album",
      {
        artist: { type: "string" },
        title: { type: "text" },
        year: { type: "number" },
        genres: { type: "string[]" },
        outOfPublication: { type: "boolean" },
      },
      {
        dataStructure: "JSON",
      }
    );
    const studioSchema = new Schema(
      "studio",
      {
        name: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
        location: { type: "point" },
        established: { type: "date" },
      },
      {
        dataStructure: "JSON",
      }
    );

    const albumRepository = new Repository(albumSchema, redis);
    // await albumRepository.createIndex();
    const studioRepository = new Repository(studioSchema, redis);
    let album = {
      artist: "Mushroomhead",
      title: "The Righteous & The Butterfly",
      year: 2014,
      genres: ["metal"],
      outOfPublication: true,
    };
    // // generate auto id
    // album = await albumRepository.save(album);
    // assign your own id
    album = await albumRepository.save(`${album.year}`, album);
    console.log(await albumRepository.fetch("2014"));

    //   let albumFetch = await albumRepository.fetch("2014");
    //   albumFetch.year = 2016;
    //   albumFetch = await albumRepository.save(albumFetch);
    //   console.log(albumFetch);
    //   albumRepository.remove("2014");
    //   const noting = await redis.exists("noting");
    //   console.log(noting);

    //   const albumSearch = await albumRepository
    //     .search()
    //     .where("year")
    //     .equals(2014)
    //     .return.all();
    //   console.log(albumSearch);
  } catch (error) {
    console.log(error);
  }
})();
