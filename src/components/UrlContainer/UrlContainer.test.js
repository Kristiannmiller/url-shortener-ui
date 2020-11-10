import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import UrlContainer from './UrlContainer.js';

describe('UrlContainer', () => {
  describe('Unit tests', () => {
    it('should render a UrlContainer', () => {
      render(
        <MemoryRouter>
          <UrlContainer
            urls={
              [{id: 1,
              long_url: 'longUrl1',
              short_url: 'shortUrl1',
              title: 'title1'},
              {id: 2,
              long_url: 'longUrl2',
              short_url: 'shortUrl2',
              title: 'title2'}]
            }
          />
        </MemoryRouter>
      )
      const containerWrap = screen.getByTestId('urlContainer')
      const urlTitle1 = screen.getByText('title1')
      const urlTitle2 = screen.getByText('title2')
      const urlShort1 = screen.getByText('shortUrl1')
      const urlShort2 = screen.getByText('shortUrl2')
      expect(containerWrap).toBeInTheDocument()
      expect(urlTitle1).toBeInTheDocument()
      expect(urlTitle2).toBeInTheDocument()
      expect(urlShort1).toBeInTheDocument()
      expect(urlShort2).toBeInTheDocument()
      expect(urlShort1.href).toBe('http://localhost/shortUrl1')
      expect(urlShort2.href).toBe('http://localhost/shortUrl2')

    })
  })
})
