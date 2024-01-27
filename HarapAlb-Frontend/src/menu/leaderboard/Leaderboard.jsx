import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchLeaderboard } from "../../api/leaderboard/leaderboardApi";
import CustomButton from "../../components/buttons/CustomButton";
import {
  leaderboardSetter,
  resetLeaderboardSetter,
} from "../../store/leaderboard/LeaderboardSlice";
import { longErrorToast } from "../../utilities/notifications/Notifications";
import "./leaderboard.scss";
import { createColumns } from "../../utilities/miscellaneous/leaderboardData";

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
        <CustomButton
          className="button"
          color="warning"
          size="large"
          text="Du-ma inapoi"
        />
      </Link>
    </div>
  );
}
