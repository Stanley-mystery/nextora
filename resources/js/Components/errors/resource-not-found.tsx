import ErrorLayout from '@/components/layouts/error-layout';

type Props = {
  resource?: string;
  returnHref?: string;
};

const ResourceNotFound = ({ resource, returnHref }: Props) => {
  if (resource) {
    return (
      <ErrorLayout
        title={`This ${resource} doesn't exist`}
        message="We can't find the page you are looking for."
        action={{
          label: `Go to ${resource}s`,
          href: returnHref ?? `/${resource}s`,
        }}
      />
    );
  }

  return (
    <ErrorLayout
      title="Resource not found"
      message="The resource you are looking for does not exist."
      action={returnHref ? { label: 'Go Back', href: returnHref } : undefined}
    />
  );
};

export default ResourceNotFound;
