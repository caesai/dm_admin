import PropTypes from 'prop-types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DocsComponents = (props: { href: string }) => (
  <div className="bg-primary bg-opacity-10 border border-2 border-primary rounded mb-4"></div>
)

DocsComponents.propTypes = {
  href: PropTypes.string,
}

export default DocsComponents
