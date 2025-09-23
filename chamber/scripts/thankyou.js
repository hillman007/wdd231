document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const details = document.getElementById('confirmation-details');
    if (!details) return;

    // Get required fields
    const firstName = params.get('firstName') || '';
    const lastName = params.get('lastName') || '';
    const email = params.get('email') || '';
    const mobile = params.get('mobile') || '';
    const organization = params.get('organization') || '';
    const timestamp = params.get('timestamp') || '';

    // Format timestamp for display
    let formattedDate = '';
    if (timestamp) {
        try {
            const date = new Date(timestamp);
            formattedDate = date.toLocaleString(undefined, {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });
        } catch {
            formattedDate = timestamp;
        }
    }

    details.innerHTML = `
        <div class="thankyou-card">
            <h2>Submission Details</h2>
            <dl>
                <dt>First Name</dt><dd>${firstName}</dd>
                <dt>Last Name</dt><dd>${lastName}</dd>
                <dt>Email</dt><dd>${email}</dd>
                <dt>Mobile Number</dt><dd>${mobile}</dd>
                <dt>Business/Organization</dt><dd>${organization}</dd>
                <dt>Submitted</dt><dd>${formattedDate}</dd>
            </dl>
        </div>
    `;
});
