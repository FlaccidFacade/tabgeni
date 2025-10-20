import Head from 'next/head'
import Link from 'next/link'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - TabGeni</title>
        <meta name="description" content="TabGeni Privacy Policy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link href="/" className="inline-block">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                🎵 TabGeni
              </h1>
            </Link>
            <p className="mt-2 text-gray-600">
              Privacy Policy
            </p>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
            
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-600 mb-4">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h3>
                <p className="text-gray-700 mb-3">
                  When you use TabGeni, we may collect the following information:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Audio files you upload for analysis</li>
                  <li>Song metadata and analysis results</li>
                  <li>Usage data and analytics</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h3>
                <p className="text-gray-700 mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Provide and improve our song analysis services</li>
                  <li>Generate tabs, chords, and backing tracks</li>
                  <li>Maintain your song library</li>
                  <li>Improve the overall user experience</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Data Storage and Security</h3>
                <p className="text-gray-700 mb-3">
                  We take the security of your data seriously:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Audio files are processed and may be stored temporarily for analysis</li>
                  <li>Song data is stored securely in our database</li>
                  <li>We implement industry-standard security measures to protect your information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Data Sharing</h3>
                <p className="text-gray-700 mb-3">
                  We do not sell or share your personal information with third parties except:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>When required by law</li>
                  <li>To protect our rights and safety</li>
                  <li>With service providers who help us operate the application</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Your Rights</h3>
                <p className="text-gray-700 mb-3">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Access your data stored in our system</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of data collection where applicable</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Cookies and Tracking</h3>
                <p className="text-gray-700 mb-3">
                  We may use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Changes to This Policy</h3>
                <p className="text-gray-700 mb-3">
                  We may update this privacy policy from time to time. We will notify users of any significant changes by updating the &ldquo;Last Updated&rdquo; date at the top of this policy.
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">8. Contact Us</h3>
                <p className="text-gray-700 mb-3">
                  If you have any questions about this privacy policy or our data practices, please contact us through our GitHub repository.
                </p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
