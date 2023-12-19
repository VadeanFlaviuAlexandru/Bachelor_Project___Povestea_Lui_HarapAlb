import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchLeaderboard } from "../../api/leaderboard/LeaderboardApi";
import {
  leaderboardSetter,
  resetLeaderboardSetter,
} from "../../store/leaderboard/LeaderboardSlice";
import { longErrorToast } from "../../utilities/notifications/Notifications";
import "./leaderboard.scss";

const createColumns = (data) => {
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

export default function Leaderboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const leaderboard = useSelector((state) => state.leaderboard.leaderboard);
  const user = useSelector((state) => state.user.user);
  const columns = createColumns(leaderboard);

  useEffect(() => {
    if (user.lastName == undefined) {
      navigate("/phaser");
      longErrorToast(
        "A apărut o eroare de validare; cel mai probabil nu ai acces la această pagină!"
      );
    } else {
      fetchLeaderboard().then((response) => {
        dispatch(leaderboardSetter(response));
      });
    }
  }, []);

  return (
    <div className="leaderboardContainer">
      <DataGrid
        className="dataGrid"
        rows={leaderboard}
        columns={columns}
        disableColumnMenu
        hideFooterSelectedRowCount={true}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
      />
      <Link
        to="/phaser"
        onClick={() => {
          dispatch(resetLeaderboardSetter());
        }}
      >
        <Button
          className="button"
          variant="contained"
          color="warning"
          size="large"
        >
          Du-ma inapoi
        </Button>
      </Link>
    </div>
  );
}
