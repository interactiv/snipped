/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package mpmedia.http;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

/**
 *
 * @author mark prades
 */
class HttpClient {

    private String query;
    private String host;
    private Integer port;
    private String charset = "utf8";

    public HttpClient() {
    }

    void connect() throws MalformedURLException, IOException {
        URLConnection connection = new URL(query).openConnection();
        connection.setDoOutput(true);// enable post
        connection.setRequestProperty("Accept-Charset", charset);
        InputStream response = connection.getInputStream();
        OutputStream output = null;

        try {
            output = connection.getOutputStream();
            output.write(query.getBytes(charset));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        } finally {
            if (output != null) {
                try {
                    output.close();
                } catch (IOException logOrIgnore) {
                    System.out.println(logOrIgnore.getMessage());
                }
            }
        }

    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }
}
