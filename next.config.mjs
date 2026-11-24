/** @type {import('next').NextConfig} */
export default {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/', destination: '/en', permanent: false },
      { source: '/it/blog/budget-50-30-20-stipendio-italiano', destination: '/it/blog/budget-50-30-20-come-adattarlo', permanent: true },
      { source: '/en/blog/50-30-20-budget-rule-italian-salary', destination: '/en/blog/50-30-20-budget-rule-how-to-adapt-it', permanent: true },
    ];
  },
};
