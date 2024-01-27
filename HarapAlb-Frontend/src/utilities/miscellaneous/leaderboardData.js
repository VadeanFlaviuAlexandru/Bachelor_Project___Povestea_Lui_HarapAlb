export const createColumns = (data) => {
  const columns = [
    { field: "lastName", headerName: "Nume", width: 150, sortable: false },
  ];

  const uniqueMiniGames = new Set([
    "Jocul de memorie",
    "Jocul de aritmetcă",
    "Grădina Ursului",
  ]);

  uniqueMiniGames.forEach((gameName) => {
    columns.push({
      field: gameName,
      headerName: gameName,
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const scoreObject = params.row.miniGamesScore.find(
          (game) => game.name === gameName
        );

        const score = scoreObject ? scoreObject.score : 0;

        const transformedScore =
          gameName === "Jocul de memorie"
            ? (score / 1000).toFixed(2) + " secunde"
            : gameName === "Grădina Ursului"
            ? score + " secunde"
            : score + " de puncte";

        return transformedScore;
      },
    });
  });

  return columns;
};
