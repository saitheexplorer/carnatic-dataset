import _ from "highland";
import csv from "csv-stream";

const reader = csv.createStream({
  enclosedChar: '"',
});

function formatRaga(raga) {
  const formatted = {
    name: raga.name,
    parent: parseInt(raga.parent),
    alternate_names: raga.alternate_names.split(",").filter((x) => x),
    arohanam: raga.arohanam.split(","),
    avarohanam: raga.avarohanam.split(","),
    anya_swarams: raga.anya_swarams.split(",").filter((x) => x),
  };

  if (raga.melakarta) formatted.melakarta = parseInt(raga.melakarta);

  return formatted;
}

_(process.stdin)
  .through(reader)
  .map(formatRaga)
  .collect()
  .map((x) => JSON.stringify(x, null, 2))
  .pipe(process.stdout);
