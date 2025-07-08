import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledPostContainer = styled.main`
  max-width: 1000px;
`;
const StyledPostHeader = styled.header`
  margin-bottom: 50px;
  .tag {
    margin-right: 10px;
  }
`;
const StyledPostContent = styled.div`
  margin-bottom: 100px;
  /* ... (keep your existing styles) ... */
`;

const PostTemplate = ({ data, location }) => {
  const post = data.markdownRemark;
  
  // Add error handling for missing frontmatter
  if (!post || !post.frontmatter) {
    return (
      <Layout location={location}>
        <StyledPostContainer>
          <h1>Post not found</h1>
          <Link to="/pensieve">Back to all posts</Link>
        </StyledPostContainer>
      </Layout>
    );
  }

  const { frontmatter, html } = post;
  const { title, date, tags } = frontmatter;

  return (
    <Layout location={location}>
      <Helmet title={title} />

      <StyledPostContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/pensieve">All memories</Link>
        </span>

        <StyledPostHeader>
          <h1 className="medium-heading">{title}</h1>
          <p className="subtitle">
            <time>
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {tags?.length > 0 && (
              <>
                <span>&nbsp;&mdash;&nbsp;</span>
                {tags.map((tag, i) => (
                  <Link key={i} to={`/pensieve/tags/${kebabCase(tag)}/`} className="tag">
                    #{tag}
                  </Link>
                ))}
              </>
            )}
          </p>
        </StyledPostHeader>

        <StyledPostContent dangerouslySetInnerHTML={{ __html: html }} />
      </StyledPostContainer>
    </Layout>
  );
};

export default PostTemplate;

PostTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string,
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
  }),
  location: PropTypes.object,
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        tags
      }
    }
