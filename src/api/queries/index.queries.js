import { gql } from 'apollo-boost';

export const ALL_TASKS = gql`
	query {
    allTasks {
			id
			number
			title
			description
			status {
				id
			}
			labels {
				id
			}
			childOf {
				id
			}
			dateCreated
		}
  }
`;