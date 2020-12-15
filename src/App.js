import React from "react";
import ContentLoader from "react-content-loader";
import "./App.css";

export default function App() {
  const [userInfo, setUserInfo] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = () => {
    setLoading(true);
    fetch(`https://randomuser.me/api/`)
      .then(res => res.json())
      .then(data => {
        setUserInfo(formatUserInfo(data.results));
        setLoading(false);
      });
  };

  const formatUserInfo = results => {
    if (!results.length || !results) {
      const noImageUrl =
        "https://lh3.googleusercontent.com/proxy/TRlZzWpYk8M3aMizpaHjSIwaFhTv8o3_p0hNa_3chToVAjUjjdcmlstBEvnowFhTzvbM6QRk5_v_bdsR3fS2ztX3UyEqIdBZNY09g5ihPRnX7HnTnPoY";
      return {
        userPicture: noImageUrl,
        userName: "...",
        userAddress: "..."
      };
    }
    const userPicture = results[0].picture.large;
    const userName = `${results[0].name.title}. ${results[0].name.first} ${
      results[0].name.last
    }`;
    const userAddress = `${results[0].location.city}, ${
      results[0].location.country
    }`;
    return {
      userPicture,
      userName,
      userAddress
    };
  };

  return (
    <div class="wrapper">
      {!loading ? (
        <Card
          image={userInfo.userPicture}
          name={userInfo.userName}
          address={userInfo.userAddress}
        />
      ) : (
        <LoadingCard />
      )}
      <div className="btn-wrapper">
        <button className="btn" onClick={() => fetchUserInfo()}>
          Next One
        </button>
      </div>
    </div>
  );
}

function LoadingCard() {
  return (
    <ContentLoader
      width={300}
      height={400}
      viewBox="0 0 300 400"
      backgroundColor="#f0f0f0"
      foregroundColor="#dedede"
    >
      <rect x="0" y="0" width="300" height="300" />
      <rect x="15" y="330" width="250" height="20" />
      <rect x="15" y="370" width="150" height="20" />
    </ContentLoader>
  );
}

function Card({ image, name, address }) {
  return (
    <div className="card">
      <img src={image} alt="person image" style={{ width: "100%" }} />
      <div className="container">
        <h4>
          <b>{name}</b>
        </h4>
        <p>{address}</p>
      </div>
    </div>
  );
}
