import { DetailViewModel } from './content-list-detail-model';

export function EventDetail(viewModel: DetailViewModel) {
    const city = viewModel.DetailItem?.City;
    const country = viewModel.DetailItem?.Country;
    const street = viewModel.DetailItem?.Street;
    const contactName = viewModel.DetailItem?.ContactName;
    const contactPhone = viewModel.DetailItem?.ContactPhone;
    const contactCell = viewModel.DetailItem?.ContactCell;
    const contactEmail = viewModel.DetailItem?.ContactEmail;
    const contactWeb = viewModel.DetailItem?.ContactWeb;
    const location = viewModel.DetailItem?.Location;
    const description = viewModel.DetailItem?.Description;
    const summary = viewModel.DetailItem?.Summary;
    const content = viewModel.DetailItem?.Content;

    return (
      <>
        <h3 className="sf-event-title">
          <span>{ viewModel.DetailItem?.Title }</span>
        </h3>
        <span className="sf-event-type" style={{background: viewModel.DetailItem?.Parent?.Color, display: 'inline-block', height: '20px', width: '20px'}} />

        {(city || country ) && (<address>
          { (() => {
                if (city && !country) {
                    return (
                      <>
                        { city } <span>,</span> {country}
                        <br />
                      </>
                    );
                } else {
                    return (
                      <>
                        {!city ? country : city}<br />
                      </>
                    );
                }
            })()
            }
            { street && street}
        </address>)
    }

        <div>
          { contactName && (
            <>
              { contactName }
              <br />
            </>
                )
            }
          { contactPhone && (
            <>
              { contactPhone }
              <br />
            </>
                )
            }
          { contactCell && (
            <>
              { contactCell }
              <br />
            </>
                )
            }

          { contactEmail && (<address><a href={`mailto:${contactEmail}`} target="_blank">{ contactEmail }</a></address>) }
          { contactWeb && (<a href={contactWeb} target="_blank">{ contactWeb }</a>) }
        </div>

        { location && (<p>{ location }</p>) }
        { description && (<p>{ description }</p>) }
        { summary && (<p>{ summary }</p>) }
        { content && (<p>{ content }</p>) }
      </>
    );
}
