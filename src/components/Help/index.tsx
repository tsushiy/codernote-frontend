import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import { MainContainer } from "../Styles";

const SettingsPage: React.FC<{}> = () => {
  const [activeTab, setActiveTab] = useState("jp");
  return (
    <MainContainer>
      <Container>
        <h1 style={{marginBottom: "14px"}}>Help</h1>
        <Nav
          variant="tabs"
          className="flex-row"
          defaultActiveKey={activeTab}
          onSelect={(eventKey: string) => {
            setActiveTab(eventKey);
          }}
        >
          <Nav.Item>
            <Nav.Link eventKey="jp">日本語</Nav.Link>
          </Nav.Item>
        </Nav>
        {activeTab === "jp" && (
          <div style={{ padding: "18px 12px" }}>
            <p>
              AtCoder, Codeforces, yukicoder, AOJ,
              LeetCodeの各問題に1対1でMarkdownノートを作成できるWebアプリケーションです。
            </p>
            <p>
              ノートを作成するには、GitHubアカウントでのログインが必要です。
              ノートの公開、非公開設定や、他の人のノートの検索ができます。
              <br/>
              AtCoder, Codeforces, yukicoder, AOJの各ユーザIDを登録することで、自分の提出を取得することができます。
            </p>
            <p>
              バグ報告や要望は
              <a
                href="https://github.com/tsushiy/codernote-frontend/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                Issues
              </a>
              からお願いします。Contributionも歓迎です。
            </p>
            <p>
              以下のAPIを使用しています。提供元に感謝いたします。
              <ul>
                <li>
                  <a
                    href="https://github.com/kenkoooo/AtCoderProblems"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    kenkoooo/AtCoderProblems
                  </a>
                </li>
                <li>
                  <a
                    href="https://codeforces.com/apiHelp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Codeforces API
                  </a>
                </li>
                <li>
                  <a
                    href="https://petstore.swagger.io/?url=https://yukicoder.me/api/swagger.yaml"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    yukicoder API
                  </a>
                </li>
                <li>
                  <a
                    href="http://developers.u-aizu.ac.jp/index"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    AOJ API
                  </a>
                </li>
                <li>LeetCode API</li>
              </ul>
            </p>
            <p>
              <a
                href="https://kenkoooo.com/atcoder"
                target="_blank"
                rel="noopener noreferrer"
              >
                AtCoder Problems
              </a>
              を大きく参考にして作成しています。
            </p>
          </div>
        )}
      </Container>
    </MainContainer>
  );
};

const Container = styled.div`
  display: block;
  position: relative;
  width: calc(100% - 30px);
  max-width: 720px;
  padding-top: 24px;
  left: 50%;
  transform: translateX(-50%);
`;

export default SettingsPage;
