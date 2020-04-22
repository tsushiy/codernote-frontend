import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Pagination } from "react-bootstrap";
import styled from "styled-components";
import { paginationList } from "../../utils/filter";
import { queryType, queryToParams } from "./index";

type Props = {
  isMyNotes: boolean;
  query: queryType;
  maxPage: number;
};

const NotesFilter: React.FC<Props> = (props: Props) => {
  const { isMyNotes, query, maxPage } = props;
  const [filterQuery, setFilterQuery] = useState(query);

  useEffect(() => {
    setFilterQuery(Object.assign({}, props.query));
  }, [props]);

  const pages = paginationList(query.page, maxPage);

  const resetFilter = () => {
    setFilterQuery({
      domain: "",
      problemNo: 0,
      userName: "",
      tag: "",
      page: 1,
      order: "",
    });
  };

  return (
    <Container>
      <FilterContainer>
        <div style={{ width: "15%", minWidth: "80px" }}>
          <Form.Control
            as="select"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFilterQuery({ ...filterQuery, domain: e.target.value })
            }
            value={filterQuery.domain}
          >
            <option value="" disabled style={{ display: "none" }}>
              Service
            </option>
            <option value="">-</option>
            <option value="atcoder">AtCoder</option>
            <option value="codeforces">Codeforces</option>
            <option value="yukicoder">yukicoder</option>
            <option value="aoj">AOJ</option>
            <option value="leetcode">LeetCode</option>
          </Form.Control>
        </div>
        {!isMyNotes && (
          <div style={{ width: "18%", minWidth: "80px" }}>
            <Form.Control
              type="text"
              placeholder="User"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilterQuery({
                  ...filterQuery,
                  userName: e.target.value,
                })
              }
              value={filterQuery.userName}
            />
          </div>
        )}
        {!isMyNotes && (
          <div style={{ width: "15%", minWidth: "80px" }}>
            <Form.Control
              type="text"
              placeholder="ProblemNo"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilterQuery({
                  ...filterQuery,
                  problemNo: parseInt(e.target.value),
                })
              }
              value={
                filterQuery.problemNo === 0 || isNaN(filterQuery.problemNo)
                  ? ""
                  : filterQuery.problemNo.toString()
              }
            />
          </div>
        )}
        <div style={{ width: "22%", minWidth: "80px" }}>
          <Form.Control
            type="text"
            placeholder="Tag"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilterQuery({ ...filterQuery, tag: e.target.value })
            }
            value={filterQuery.tag}
          />
        </div>
        <div style={{ padding: "2px 0" }}>
          <LinkContainer to={isMyNotes ? `/mynotes` : `/notes`}>
            <Button variant="outline-light" type="button" onClick={resetFilter}>
              Reset
            </Button>
          </LinkContainer>
        </div>
        <div style={{ padding: "2px 0" }}>
          <LinkContainer
            to={
              isMyNotes
                ? `/mynotes?${queryToParams(filterQuery)}`
                : `/notes?${queryToParams(filterQuery)}`
            }
          >
            <Button variant="primary" type="button">
              Filter
            </Button>
          </LinkContainer>
        </div>
      </FilterContainer>
      <PaginationContainer>
        <Pagination style={{ justifyContent: "center" }}>
          {pages.map((v, k) => {
            const params = queryToParams({ ...filterQuery, page: v });
            return (
              <LinkContainer
                key={k}
                to={isMyNotes ? `/mynotes?${params}` : `/notes?${params}`}
              >
                <Pagination.Item active={v === query.page}>{v}</Pagination.Item>
              </LinkContainer>
            );
          })}
        </Pagination>
      </PaginationContainer>
    </Container>
  );
};

const Container = styled.div`
  display: block;
  word-wrap: break-word;
`;

const FilterContainer = styled.div`
  display: inline-block;
  width: 100%;
  padding: 8px 8px 14px;

  & > div {
    display: inline-block;
    margin-right: 4px;
  }
`;

const PaginationContainer = styled.div`
  display: block;
  width: 100%;
`;

export default NotesFilter;
