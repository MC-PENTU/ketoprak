from neo4j import GraphDatabase

def neo4j_delete_all(uri, auth, db_name="neo4j"):
    driver = GraphDatabase.driver(uri, auth=auth)
    driver.execute_query(
        "MATCH (n) DETACH DELETE n",
        database_=db_name
    )
    driver.close()
    print(f"Successfully deleted all nodes and relationships in the database ({db_name})")

def neo4j_add_query(uri, auth, query, db_name="neo4j"):
    driver = GraphDatabase.driver(uri, auth=auth)
    driver.execute_query(
        query,
        database_=db_name
    )
    driver.close()
    print(f"Successfully added the query to the database ({db_name})")

def neo4j_num_element(uri, auth, db_name="neo4j"):
    driver = GraphDatabase.driver(uri, auth=auth)
    count = driver.execute_query(
        "MATCH (n) RETURN COUNT(n)",
        database_=db_name
    )
    print(count.records[0][0])
    driver.close()
    print(f"Successfully added the query to the database ({db_name})")