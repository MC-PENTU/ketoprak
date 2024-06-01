from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI
from articles_parser import parse_news
from typing import List
from langchain_core.prompts import PromptTemplate
from langchain.output_parsers import PydanticOutputParser
class ArticleSummary(BaseModel):
    relations: List[str] =  Field(..., description="Relations extracted from the article, must contain exactly 2 entities and a type of relation between theme, each relation must be in the form of '<entity1> <relation> <entity2>'")
    properties: List[str] = Field(..., description="Properties of entity extracted from the article, must contain exactly 1 entity and one or more property of that entity, each property must be in the form of '<entity> <property>'")

class ArticleLLM():
    def __init__(self, model, api_key, temperature):
        self.parser = PydanticOutputParser(pydantic_object=ArticleSummary)
        
        self.class_context_template =  """
            You are a data modeling expert. You will be given an article and you will help me structure the data based on this format.
            
            Don't need to put '-' between entity and relation or property. For example, if the entity is 'Apple' and the relation is 'founded', you should write 'Apple founded Steve Jobs'.
            
            Entities can only be one of people, locations, organizations, events, objects, incidents, and resolutions. Otherwise, don't consider it as an entity.
            
            Don't include any relations or properties that are not in the article.
            
            {format_instructions}
            
            Article: {article} 
        """
        
        self.cypher_context_template = """
            You are also familiar with Cypher Query Language and Neo4j graph database.
            
            Based on the given relations and properties, you will help me to create a graph database query using Cypher Query Language.
            
            Combine everything into a single query without using any comments using the MERGE Command. 
            
            Make sure each entity is declared before using them in the relation.
            
            Relations and properties extracted from the article: 
            {response}
        """
        
        self.context_prompt = PromptTemplate(
            input_variables=["article"],
            template=self.class_context_template,
            partial_variables={"format_instructions": self.parser.get_format_instructions()}
        )
        
        self.cypher_prompt = PromptTemplate(
            input_variables=["response"],
            template=self.cypher_context_template
        )
        
        self.llm = ChatOpenAI(
            model=model,
            api_key=api_key,
            temperature=temperature
        )
        
        self.context_chain = self.context_prompt | self.llm | self.parser
        self.cyper_chain = self.cypher_prompt | self.llm
    
    def __run(self, article_link):
        article = parse_news(article_link)['text']
        response = self.context_chain.invoke({"article":article})
        return response
    
    def __format_output(self, response):
        try:
            relations = response.relations
        except:
            relations = []
        
        try:
            properties = response.properties
        except:
            properties = []
        
        outputs = relations + properties
        outputs = '\n'.join(outputs)
        
        return outputs
    
    def inference(self, article_link):
        response = self.__run(article_link)
        response = self.__format_output(response) 
        response = self.cyper_chain.invoke({"response":response}).content
        print("Inference Successful")
        return response