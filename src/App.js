import React from "react";
import { Layout, Menu } from "antd";
import "./App.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import PokemonList from "./components/PokemonList";

const { Content } = Layout;
let page = <PokemonList />;

class App extends React.Component {
  /**
   * Change render component of navbar
   * swicthPage - @param {string} key Number of page to render
   */
  swicthPage = (key) => {
    if (key === "1") {
      page = <PokemonList />;
    }
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <div className="logo" />
        <Menu
          onSelect={(item) => {
            this.setState({
              key: item.key,
            });
            this.swicthPage(item.key);
          }}
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="horizontal"
        >
          <Menu.Item key="1">
            <span>Pokedex</span>
          </Menu.Item>
        </Menu>

        <Layout>
          <Content style={{ lineHeight: "64px", background: "#fff" }}>
            {page}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
